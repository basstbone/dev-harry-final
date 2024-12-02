$(document).ready(function () {
    // Sample data
    const orderData = {
        customerName: "Jane Doe",
        contact: "123-456-7890",
        deliveryDate: "2024-12-05T14:00",
        items: [
            { productName: "Wireless Mouse", quantity: 1 },
            { productName: "Keyboard", quantity: 2 }
        ],
        giftWrap: true
    };

    let order = { ...orderData }; // Clone the data for edits

    // Load Order Data
    $("#loadOrder").click(function () {
        $("#customerName").val(order.customerName);
        $("#contact").val(order.contact);
        $("#deliveryDate").val(order.deliveryDate);
        $("#giftWrap").prop("checked", order.giftWrap);

        const itemsContainer = $("#itemsContainer");
        itemsContainer.empty();
        order.items.forEach((item, index) => {
            itemsContainer.append(`
                <div class="mb-3">
                    <label class="form-label">Item ${index + 1}</label>
                    <input type="text" class="form-control mb-2" value="${item.productName}" data-index="${index}" data-type="name">
                    <input type="number" class="form-control" value="${item.quantity}" data-index="${index}" data-type="quantity">
                </div>
            `);
        });
    });

    // Save Order Data
    $("#saveOrder").click(function () {
        order.customerName = $("#customerName").val();
        order.contact = $("#contact").val();
        order.deliveryDate = $("#deliveryDate").val();
        order.giftWrap = $("#giftWrap").is(":checked");

        $("#itemsContainer input").each(function () {
            const index = $(this).data("index");
            const type = $(this).data("type");

            if (type === "name") {
                order.items[index].productName = $(this).val();
            } else if (type === "quantity") {
                order.items[index].quantity = parseInt($(this).val(), 10);
            }
        });

        // Log JSON to Console
        console.log(JSON.stringify(order, null, 2));

        alert("Order saved! Check the console for details.");
    });

    // Clear Form
    $("#clearOrder").click(function () {
        $("#orderForm")[0].reset();
        $("#itemsContainer").empty();
    });
});