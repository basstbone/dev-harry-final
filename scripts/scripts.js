$(document).ready(function () {
    const phoneInput = $("#contact");

    // Sample data
    const orderData = {
        customerName: "Jane Doe",
        contact: "(123) 456-7890",
        deliveryDate: "2024-12-05T14:00",
        items: [
            { productName: "Wireless Mouse", quantity: 1 },
            { productName: "Keyboard", quantity: 2 }
        ],
        giftWrap: true
    };

    let order = { ...orderData }; // Clone the data for edits

    // Automatically format phone input
    phoneInput.on("input", function () {
        let input = phoneInput.val();

        // Remove all non-digit characters
        input = input.replace(/\D/g, "");

        // Limit input to 10 digits
        input = input.substring(0, 10);

        // Apply formatting
        let formatted = "";
        if (input.length > 0) {
            formatted += "(" + input.substring(0, 3);
        }
        if (input.length >= 4) {
            formatted += ") " + input.substring(3, 6);
        }
        if (input.length >= 7) {
            formatted += "-" + input.substring(6, 10);
        }

        // Set the formatted value back to the input field
        phoneInput.val(formatted);

        // Validate length for complete number
        if (formatted.length === 14) {
            phoneInput.removeClass("is-invalid").addClass("is-valid");
        } else {
            phoneInput.removeClass("is-valid").addClass("is-invalid");
        }
    });

    // Load Order Data
    $("#loadOrder").click(function () {
        $("#customerName").val(order.customerName);
        phoneInput.val(order.contact).trigger("input"); // Format phone number
        $("#deliveryDate").val(order.deliveryDate);
        $("#giftWrap").prop("checked", order.giftWrap);

        const itemsContainer = $("#itemsContainer");
        itemsContainer.empty();
        order.items.forEach((item, index) => {
            itemsContainer.append(`
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Item ${index + 1}</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" value="${item.productName}" data-index="${index}" data-type="name">
                    </div>
                    <label class="col-sm-2 col-form-label">Quantity</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" value="${item.quantity}" data-index="${index}" data-type="quantity">
                    </div>
                </div>
            `);
        });
    });

    // Save Order Data
    $("#saveOrder").click(function () {
        if (phoneInput.hasClass("is-invalid")) {
            alert("Please enter a valid phone number in the format (123) 456-7890.");
            return; // Stop saving if invalid
        }

        order.customerName = $("#customerName").val();
        order.contact = phoneInput.val();
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
        phoneInput.removeClass("is-valid is-invalid"); // Reset phone validation classes
    });
});