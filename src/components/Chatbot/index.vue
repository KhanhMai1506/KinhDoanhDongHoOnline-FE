<template>
  <div class="chat-container">
    <div class="header">
      <h1>💬 Trợ lý Đồng Hồ Thông Minh</h1>
      <div class="status-indicator" :class="{ online: isOnline, offline: !isOnline }">
        {{ isOnline ? '🟢 Online' : '🔴 Offline' }}
      </div>
    </div>

    <div class="chat-box" ref="chatBox">
      <div v-if="messages.length === 0" class="welcome-message">
        <p>👋 Chào bạn! Tôi là trợ lý AI chuyên tư vấn về đồng hồ.</p>
        <p>Bạn có thể hỏi về:</p>
        <ul>
          <li>📱 Sản phẩm các thương hiệu (Casio, Seiko, Citizen, Orient)</li>
          <li>💰 Giá cả và đặc điểm sản phẩm</li>
          <li>🛡️ Chính sách bảo hành và đổi trả</li>
          <li>💳 Hình thức thanh toán</li>
          <li>📞 Thông tin liên hệ</li>
        </ul>
      </div>

      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
        <div class="message-content">
          <span class="sender-label">{{ msg.sender === 'user' ? '🧑 Bạn:' : '🤖 Trợ lý:' }}</span>
          <span v-html="formatMessage(msg.text)"></span>
        </div>
        <div v-if="msg.timestamp" class="message-time">
          {{ formatTime(msg.timestamp) }}
        </div>
      </div>

      <div v-if="isLoading" class="message bot">
        <div class="message-content">
          <strong>🤖 Trợ lý:</strong>
          <span class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </div>

    <div class="input-container">
      <form @submit.prevent="sendMessage" :class="{ disabled: isLoading }">
        <input v-model="newMessage" placeholder="Hỏi về đồng hồ, giá cả, chính sách..." @keyup.enter="sendMessage"
          :disabled="isLoading" ref="messageInput" />
        <button type="submit" :disabled="isLoading || !newMessage.trim()">
          <span v-if="!isLoading">Gửi</span>
          <span v-else>⏳</span>
        </button>
      </form>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        <button @click="clearError" class="error-close">×</button>
      </div>
    </div>

    <div class="footer">
      <div class="session-info">
        <span v-if="sessionId">Session: {{ sessionId.slice(0, 8) }}...</span>
        <span v-else>Chưa có session</span>
      </div>
      <button @click="clearChat" class="clear-btn">🗑️ Xóa chat</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
      sessionId: null,
      isLoading: false,
      isOnline: true,
      errorMessage: '',
      apiBaseUrl: 'http://localhost:8001'
    }
  },

  async created() {
    this.sessionId = localStorage.getItem('watch_session_id') || null
    await this.checkHealth()
  },

  mounted() {
    this.focusInput()
  },

  methods: {
    async checkHealth() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/health`)
        this.isOnline = response.ok
      } catch (error) {
        this.isOnline = false
        console.error('Health check failed:', error)
      }
    },

   formatMessage(text) {
  if (!text) return '';
  // Chỉ xử lý xuống dòng, giữ nguyên văn bản gốc
  return text.replace(/\n/g, '<br>');
},

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    focusInput() {
      this.$nextTick(() => {
        this.$refs.messageInput?.focus()
      })
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight
        }
      })
    },

    clearError() {
      this.errorMessage = ''
    },

    clearChat() {
      this.messages = []
      this.sessionId = null
      localStorage.removeItem('watch_session_id')
      this.focusInput()
    },

    async sendMessage() {
      if (!this.newMessage.trim() || this.isLoading) return

      const question = this.newMessage.trim()
      this.messages.push({
        sender: 'user',
        text: question,
        timestamp: new Date()
      })
      this.newMessage = ''
      this.isLoading = true
      this.errorMessage = ''
      this.scrollToBottom()

      try {
        const response = await fetch(`${this.apiBaseUrl}/chat-stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain"
          },
          body: JSON.stringify({
            question,
            session_id: this.sessionId
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        // Lưu session id từ cookie
        const cookies = response.headers.get('set-cookie')
        if (cookies) {
          const sessionMatch = cookies.match(/session_id=([^;]+)/)
          if (sessionMatch && !this.sessionId) {
            this.sessionId = sessionMatch[1]
            localStorage.setItem('watch_session_id', this.sessionId)
          }
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let botMsg = ''
        const botIndex = this.messages.push({
          sender: 'bot',
          text: '',
          timestamp: new Date()
        }) - 1

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          botMsg += chunk
          this.messages[botIndex].text = botMsg
          this.scrollToBottom()
        }

      } catch (error) {
        console.error('Chat error:', error)

        let errorText = '⚠️ Lỗi kết nối với hệ thống. Vui lòng thử lại sau.'

        if (error.message.includes('429')) {
          errorText = '⚠️ Quá nhiều yêu cầu. Vui lòng đợi 1 phút rồi thử lại.'
        } else if (error.message.includes('400')) {
          errorText = '⚠️ Câu hỏi không hợp lệ. Vui lòng kiểm tra lại.'
        } else if (error.message.includes('500')) {
          errorText = '⚠️ Lỗi server. Vui lòng thử lại sau.'
        }

        this.messages.push({
          sender: 'bot',
          text: errorText,
          timestamp: new Date()
        })
        this.errorMessage = errorText
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.focusInput()
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  max-width: 700px;
  margin: 20px auto;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.status-indicator {
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
}

.status-indicator.online {
  background: rgba(46, 204, 113, 0.3);
}

.status-indicator.offline {
  background: rgba(231, 76, 60, 0.3);
}

.chat-box {
  height: 500px;
  padding: 20px;
  background: #f8f9fa;
  overflow-y: auto;
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

.message {
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease-in;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
}

.message.user {
  text-align: right;
}

.message.user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-left: auto;
}

.message.bot .message-content {
  background: white;
  color: #2c3e50;
  border: 1px solid #e9ecef;
}

.message-time {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 5px;
  text-align: center;
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

.input-container {
  padding: 20px;
  background: white;
}

form {
  display: flex;
  gap: 10px;
  align-items: center;
}

form.disabled {
  opacity: 0.7;
  pointer-events: none;
}

input {
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input:disabled {
  background: #e9ecef;
  cursor: not-allowed;
}

button {
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

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  margin-top: 10px;
  padding: 10px 15px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.error-close {
  background: none;
  border: none;
  color: #721c24;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  min-width: auto;
}

.error-close:hover {
  color: #491217;
  transform: none;
  box-shadow: none;
}

.footer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6c757d;
}

.session-info {
  font-family: monospace;
}

.clear-btn {
  background: #6c757d;
  font-size: 14px;
  padding: 8px 16px;
  min-width: auto;
}

.clear-btn:hover {
  background: #5a6268;
}

/* Styling for formatted content */
:deep(.price) {
  color: #e74c3c;
  font-weight: bold;
  background: #fdf2f2;
  padding: 2px 6px;
  border-radius: 4px;
}

:deep(.model) {
  color: #2980b9;
  font-weight: bold;
  background: #f0f8ff;
  padding: 2px 6px;
  border-radius: 4px;
}

:deep(.phone) {
  color: #27ae60;
  font-weight: bold;
  background: #f0fff4;
  padding: 2px 6px;
  border-radius: 4px;
}

:deep(.address) {
  color: #8e44ad;
  font-weight: bold;
  background: #f8f4ff;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Responsive design */
@media (max-width: 768px) {
  .chat-container {
    margin: 10px;
    border-radius: 10px;
  }

  .header {
    padding: 15px;
  }

  .header h1 {
    font-size: 1.2rem;
  }

  .chat-box {
    height: 400px;
    padding: 15px;
  }

  .input-container {
    padding: 15px;
  }

  .message-content {
    max-width: 90%;
  }

  .footer {
    padding: 10px 15px;
    flex-direction: column;
    gap: 10px;
  }
}
</style>