import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{maxWidth: 800, margin: "48px auto", padding: 16}}>
          <h1>Đã có lỗi khi hiển thị trang</h1>
          <p>Hãy thử làm mới trang. Nếu vẫn lỗi, xóa cache tab đã lưu:</p>
          <pre style={{background:"#210a14", padding:12, borderRadius:8, overflowX:"auto"}}>localStorage.removeItem('activeTab')</pre>
          <p>Chi tiết lỗi:</p>
          <code style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</code>
        </div>
      );
    }
    return this.props.children;
  }
}
