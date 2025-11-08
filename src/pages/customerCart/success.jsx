function success() {
    
        // Get the order ID from the URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('orderId');

        // Display the order ID on the page
        if (orderId) {
            document.getElementById('orderId').textContent = "Order ID: " + orderId;
        }
    return (<>
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment.</p>
        <p id="orderId"></p>
    </>);
}

export default success