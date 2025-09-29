<template>
  <div class="chat-title">Hỗ trợ trực tuyến 🧑‍💻</div>
  <div class="chat-page-container">
    <div class="chat-card">
      <div class="chat-layout">
        <div class="chat-box" ref="chatBox">
          <div v-if="messages.length === 0" class="welcome-message">
            <p>👋 Xin chào! Rất vui được hỗ trợ bạn.</p>
            <p>Bạn có thể trao đổi với chúng tôi về:</p>
            <ul>
              <li>📦 Tình trạng đơn hàng, giao hàng</li>
              <li>💰 Giá cả và phương thức thanh toán</li>
              <li>⌚ Thông tin sản phẩm (Casio, Seiko, Citizen, Orient...)</li>
              <li>🛡️ Chính sách bảo hành và đổi trả</li>
              <li>📑 Hướng dẫn sử dụng sản phẩm</li>
              <li>📞 Thông tin liên hệ, góp ý dịch vụ</li>
            </ul>
          </div>

          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message-wrapper"
            :class="{
              'my-message': !msg.is_admin,
              'their-message': msg.is_admin,
            }"
          >
            <div class="message">
              <span v-html="formatMessage(msg.content)"></span>

              <div v-if="msg.timestamp" class="message-time">
                {{ formatTime(msg.timestamp) }}
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="message-wrapper their-message">
            <div class="message">
              <strong>⏳ Đang gửi...</strong>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input
            type="text"
            placeholder="Hỏi về đồng hồ, giá cả, chính sách..."
            v-model="newMessage"
            :disabled="isLoading"
            @keyup.enter="sendMessage"
            ref="messageInput"
          />
          <button
            type="submit"
            @click="sendMessage"
            :disabled="isLoading || !newMessage.trim()"
          >
            <span v-if="!isLoading">Gửi</span>
            <span v-else>⏳</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default {
  data() {
    return {
      newMessage: "",
      messages: [],
      isLoading: false,
      user: null,
    };
  },
  async mounted() {
    await this.fetchUser();
    if (this.user) {
      this.initChat();
    } else {
      console.log("No Firebase user is signed in.");
    }
  },
  methods: {
    async fetchUser() {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
      const token = localStorage.getItem("token_khach_hang");
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}/api/khach-hang/profile/data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.data;
        if (user) {
          this.user = user;
          this.user.id = String(user.id);
          this.name_kh = user.ho_va_ten;
          this.avatar = user.hinh_anh || "https://via.placeholder.com/50";
          localStorage.setItem("khach_hang", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    },
    async initChat() {
      await this.getConversationDoc(this.user.id);
      this.listenMessages(this.user.id, (msgs) => {
        this.messages = msgs;
        this.isLoading = false;
        this.scrollToBottom();
      });
    },
    async getConversationDoc(conversationId) {
      const docRef = doc(db, "conversation", String(conversationId));
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          userId: conversationId,
          createdAt: serverTimestamp(),
          last_message: null,
          last_message_time: null,
        });
      }
    },
    listenMessages(conversationId, callback) {
      const messagesRef = collection(
        doc(db, "conversation", String(conversationId)),
        "message"
      );
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      });
    },
    async sendMessage() {
      if (!this.newMessage.trim() || this.isLoading) return;

      this.isLoading = true;
      const messageContent = this.newMessage.trim();

      this.newMessage = "";
      try {
        const messagesRef = collection(
          doc(db, "conversation", this.user.id),
          "message"
        );
        const newMessageData = {
          content: messageContent,
          timestamp: serverTimestamp(),
          is_admin: false,
        };
        await addDoc(messagesRef, newMessageData);
        const conversationRef = doc(db, "conversation", this.user.id);
        await updateDoc(conversationRef, {
          last_message: messageContent,
          last_message_time: serverTimestamp(),
        });
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      } finally {
        this.isLoading = false;
      }
    },
    formatMessage(text) {
      if (!text) return "";
      return text.replace(/\n/g, "<br>");
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
    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
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
  flex-direction: column;
}

.chat-box {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.welcome-message {
  text-align: center;
  color: #6c757d;
  margin-bottom: 20px;
}

.welcome-message p {
  margin: 10px 0;
}

.welcome-message ul {
  text-align: left;
  max-width: 400px;
  margin: 15px auto;
}

.welcome-message li {
  margin: 8px 0;
  padding: 5px 0;
}

.message-wrapper {
  display: flex;
  margin-bottom: 15px;
}

.my-message {
  justify-content: flex-end;
}

.my-message .message-time {
  color: #fff;
}

.their-message {
  justify-content: flex-start;
}

.message {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
}

.my-message .message {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.their-message .message {
  background: white;
  color: #2c3e50;
  border: 1px solid #e9ecef;
}

.message-time {
  font-size: 10px;
  color: #6c757d;
  margin-top: 5px;
  text-align: right;
}

.their-message .message-time {
  text-align: left;
}

.typing-indicator {
  display: inline-flex;
  gap: 3px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6c757d;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-input {
  padding: 20px;
  background: white;
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input input {
  flex-grow: 1;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.chat-input input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.chat-input input:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

.chat-input button {
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  min-width: 80px;
}

.chat-input button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.chat-input button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
