<template>
  <div class="chat-title">Trung tâm hỗ trợ 🛠️</div>
  <div class="chat-page-container">
    <div class="chat-card">
      <div class="chat-layout">
        <div class="conversation-list" ref="conversationList">
          <div class="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm cuộc hội thoại..."
              v-model="searchQuery"
              @input="filterConversations"
              @keyup.enter="searchConversations"
            />
          </div>
          <ul class="conversation-items">
            <li
              v-for="conversation in filteredConversations"
              :key="conversation.id"
              :class="[
                'conversation',
                {
                  'active-conversation':
                    selectedConversation &&
                    selectedConversation.id === conversation.id,
                },
              ]"
              @click="selectConversation(conversation)"
            >
              <img
                :src="
                  conversation.customer_avatar ||
                  'https://via.placeholder.com/50'
                "
                alt="avatar"
                class="avatar"
              />
              <div class="conversation-info">
                <h6>{{ conversation.customer_name }}</h6>
                <small>{{
                  conversation.last_message || "Chưa có tin nhắn"
                }}</small>
              </div>
              <span class="message-time">
                {{ formatTime(conversation.last_message_time) }}
              </span>
            </li>
            <div v-if="loadingConversations" class="loading-state">
              Đang tải...
            </div>
            <div
              v-if="!hasMoreConversations && !loadingConversations"
              class="end-of-list"
            >
              Đã tải hết
            </div>
          </ul>
        </div>

        <div class="chat-box" v-if="selectedConversation">
          <div class="chat-body" ref="chatMessages">
            <div v-if="loadingMessages" class="loading-state">
              Đang tải tin nhắn...
            </div>
            <div
              v-for="message in messages"
              :key="message.id"
              class="message-wrapper"
              :class="{
                'my-message': message.is_admin,
                'their-message': !message.is_admin,
              }"
            >
              <div class="message">
                {{ message.content }}
                <div v-if="message.timestamp" class="message-time">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              v-model="newMessage"
              :disabled="isLoading"
              @keyup.enter="sendMessage"
            />
            <button
              @click="sendMessage"
              :disabled="isLoading || !newMessage.trim()"
            >
              Gửi
            </button>
          </div>
        </div>
        <div class="no-conversation-selected" v-else>
          <h4>Vui lòng chọn một cuộc hội thoại</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import axios from "axios";
import { db } from "@/firebase";

const CONVERSATION_LIMIT = 20;

export default {
  data() {
    return {
      conversations: [],
      selectedConversation: null,
      messages: [],
      newMessage: "",
      searchQuery: "",
      lastVisibleConversation: null,
      loadingConversations: false,
      loadingMessages: false,
      hasMoreConversations: true,
      unsubscribeConversations: null,
      unsubscribeMessages: null,
      apiBaseUrl: "http://127.0.0.1:8000",
      isLoading: false,
      filteredConversations: [],
    };
  },
  mounted() {
    this.listenToConversations();
    this.$refs.conversationList.addEventListener(
      "scroll",
      this.handleConversationScroll
    );
  },
  beforeUnmount() {
    if (this.unsubscribeConversations) {
      this.unsubscribeConversations();
    }
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
    }
    this.$refs.conversationList.removeEventListener(
      "scroll",
      this.handleConversationScroll
    );
  },
  methods: {
    listenToConversations() {
      this.loadingConversations = true;
      const q = query(
        collection(db, "conversation"),
        orderBy("last_message_time", "desc"),
        limit(CONVERSATION_LIMIT)
      );

      this.unsubscribeConversations = onSnapshot(
        q,
        async (querySnapshot) => {
          const conversationDocs = [];
          const userIds = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            conversationDocs.push({ id: doc.id, ...data });
            if (data.userId) {
              userIds.push(data.userId);
            }
          });
          const usersData = await this.fetchUsersByIds(userIds);
          const newConversations = conversationDocs.map((conv) => {
            const user = usersData.find(
              (u) => String(u.id) === String(conv.userId)
            );
            return {
              ...conv,
              customer_name: user ? user.ho_va_ten : "Khách hàng không rõ",
              customer_avatar: user ? user.hinh_anh : null,
            };
          });

          this.conversations = newConversations;
          this.filteredConversations = this.conversations;
          this.lastVisibleConversation =
            querySnapshot.docs[querySnapshot.docs.length - 1];
          if (querySnapshot.size < CONVERSATION_LIMIT) {
            this.hasMoreConversations = false;
          }
          this.loadingConversations = false;

          // Logic mới: Tự động chọn cuộc hội thoại đầu tiên nếu có
          if (
            !this.selectedConversation &&
            this.filteredConversations.length > 0
          ) {
            this.selectConversation(this.filteredConversations[0]);
          }
        },
        (error) => {
          console.error("Error listening to conversations:", error);
          this.loadingConversations = false;
        }
      );
    },

    async fetchConversations() {
      if (this.loadingConversations || !this.hasMoreConversations) return;
      this.loadingConversations = true;

      try {
        let q = query(
          collection(db, "conversation"),
          orderBy("last_message_time", "desc"),
          startAfter(this.lastVisibleConversation),
          limit(CONVERSATION_LIMIT)
        );

        const querySnapshot = await getDocs(q);
        const conversationDocs = [];
        const userIds = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          conversationDocs.push({ id: doc.id, ...data });
          if (data.userId) {
            userIds.push(data.userId);
          }
        });
        const usersData = await this.fetchUsersByIds(userIds);
        const newConversations = conversationDocs.map((conv) => {
          const user = usersData.find(
            (u) => String(u.id) === String(conv.userId)
          );
          return {
            ...conv,
            customer_name: user ? user.ho_va_ten : "Khách hàng không rõ",
            customer_avatar: user ? user.hinh_anh : null,
          };
        });

        this.conversations = [...this.conversations, ...newConversations];
        this.filteredConversations = this.conversations;
        this.lastVisibleConversation =
          querySnapshot.docs[querySnapshot.docs.length - 1];
        if (querySnapshot.size < CONVERSATION_LIMIT) {
          this.hasMoreConversations = false;
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        this.loadingConversations = false;
      }
    },

    async fetchUsersByIds(userIds) {
      if (userIds.length === 0) {
        return [];
      }
      try {
        const response = await axios.post(
          `${this.apiBaseUrl}/api/admin/khach-hang/get-by-ids`,
          {
            ids: userIds,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_admin"),
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.error("Error fetching users from API:", error);
        return [];
      }
    },
    handleConversationScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        this.$refs.conversationList;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        this.fetchConversations();
      }
    },
    selectConversation(conversation) {
      if (
        this.selectedConversation &&
        this.selectedConversation.id === conversation.id
      ) {
        return;
      }
      if (this.unsubscribeMessages) {
        this.unsubscribeMessages();
      }
      this.selectedConversation = conversation;
      this.messages = [];
      this.fetchMessages();
    },
    fetchMessages() {
      if (!this.selectedConversation) return;
      this.loadingMessages = true;
      const messagesRef = collection(
        db,
        "conversation",
        this.selectedConversation.id,
        "message"
      );
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      this.unsubscribeMessages = onSnapshot(
        q,
        (snapshot) => {
          const newMessages = [];
          snapshot.forEach((doc) => {
            newMessages.push({ id: doc.id, ...doc.data() });
          });
          this.messages = newMessages;
          this.loadingMessages = false;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        },
        (error) => {
          console.error("Error fetching messages:", error);
          this.loadingMessages = false;
        }
      );
    },
    async sendMessage() {
      if (
        !this.newMessage.trim() ||
        !this.selectedConversation ||
        this.isLoading
      )
        return;

      this.isLoading = true;
      const messageContent = this.newMessage.trim();

      try {
        const messagesRef = collection(
          db,
          "conversation",
          this.selectedConversation.id,
          "message"
        );
        await addDoc(messagesRef, {
          content: messageContent,
          timestamp: serverTimestamp(),
          is_admin: true,
          sender: "admin",
        });

        const conversationRef = doc(
          db,
          "conversation",
          this.selectedConversation.id
        );
        await updateDoc(conversationRef, {
          last_message: messageContent,
          last_message_time: serverTimestamp(),
        });

        this.newMessage = "";
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        this.isLoading = false;
      }
    },
    scrollToBottom() {
      const chatBody = this.$refs.chatMessages;
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    },
    formatTime(timestamp) {
      if (!timestamp) return "";
      if (timestamp.toDate) {
        const date = timestamp.toDate();
        return date.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return "";
    },
    filterConversations() {
      const query = this.searchQuery.toLowerCase();
      this.filteredConversations = this.conversations.filter((conversation) =>
        conversation.customer_name.toLowerCase().includes(query)
      );
    },
    searchConversations() {
      this.filterConversations();
    },
  },
};
</script>

<style scoped>
.chat-title {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  text-align: center;
}

.chat-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.chat-card {
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
}

.chat-layout {
  display: flex;
  width: 100%;
  height: 100%;
}

.conversation-list {
  width: 350px;
  flex-shrink: 0;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.search-box {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.search-box input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
}

.conversation-items {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.conversation-items li {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.conversation-items li:hover {
  background-color: #f5f5f5;
}

.conversation-items li.active-conversation {
  background-color: #007bff;
  color: #fff;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.conversation {
  display: flex;
}

.conversation-info {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-info h6 {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-info small {
  display: block;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.active-conversation .conversation-info small,
.active-conversation .message-time {
  color: #fff;
}

.active-conversation .conversation-info small,
.active-conversation h6 {
  color: #fff;
}

.message-time {
  font-size: 11px;
  color: #aaa;
  white-space: nowrap;
}

.chat-box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  flex-shrink: 0;
}

.chat-header h5 {
  margin: 0;
  font-size: 18px;
}

.chat-header small {
  font-size: 13px;
  color: #888;
}

.chat-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message-wrapper {
  display: flex;
  margin-bottom: 15px;
}

.my-message {
  justify-content: flex-end;
}

.their-message {
  justify-content: flex-start;
}

.message {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
}

.my-message .message {
  background-color: #007bff;
  color: #fff;
}

.their-message .message {
  background-color: #e5e5e5;
  color: #333;
}

.message-time {
  font-size: 10px;
  margin-top: 5px;
  text-align: right;
  color: #999;
}

.my-message .message-time {
  color: #fff;
}

.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #e5e5e5;
  flex-shrink: 0;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.chat-input button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.no-conversation-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: #888;
  font-size: 1.2rem;
  text-align: center;
}
.end-of-list {
  text-align: center;
  padding: 10px;
  color: #888;
  font-size: 0.9em;
}
.loading-state {
  text-align: center;
  padding: 10px;
  color: #888;
}
</style>
