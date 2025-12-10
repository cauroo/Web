document.addEventListener('DOMContentLoaded', () => {

    // ---- Categories Page ----
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                localStorage.setItem('selectedCategory', category);
                window.location.href = 'subcategories.html';
            });
        });
    }

    // ---- Subcategories Page ----
    const subcategoriesContainer = document.getElementById('subcategories');
    const subcategoryTitle = document.getElementById('subcategory-title');
    const nextBtn = document.getElementById('next-step');

    if (subcategoriesContainer) {
        const category = localStorage.getItem('selectedCategory');
        if (!category) {
            window.location.href = 'categories.html';
        }

        subcategoryTitle.textContent = `Select Subcategory for ${category}`;

        let subcategories = [];
        if (category === "Automation & Control Systems") {
            subcategories = ["Embedded & Microcontroller Systems", "Smart Home & IoT Systems", "Other Automation Services"];
        } else if (category === "Equipment & Device Servicing") {
            subcategories = ["Household Appliances", "Consumer Electronics", "Electronic Toys & Gadgets", "Other Repair Services"];
        } else if (category === "Software & Application Solutions") {
            subcategories = ["Web Development & Design", "Mobile & Desktop Applications", "Other Software Solutions"];
        } else {
            subcategories = ["Custom Services"];
        }

        subcategories.forEach(sub => {
            const btn = document.createElement('button');
            btn.textContent = sub;
            btn.classList.add('subcategory-btn');
            subcategoriesContainer.appendChild(btn);

            btn.addEventListener('click', () => {
                document.querySelectorAll('.subcategory-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                localStorage.setItem('selectedSubcategory', sub);
                nextBtn.disabled = false;
            });
        });

        nextBtn.addEventListener('click', () => {
            window.location.href = 'details.html';
        });
    }

    // ---- Details Page ----
    const summaryCategory = document.getElementById('summary-category');
    const summarySubcategory = document.getElementById('summary-subcategory');
    const submitBtn = document.getElementById('submit-btn');

    if (summaryCategory && summarySubcategory) {
        summaryCategory.textContent = localStorage.getItem('selectedCategory') || "N/A";
        summarySubcategory.textContent = localStorage.getItem('selectedSubcategory') || "N/A";

        submitBtn.addEventListener('click', () => {
            const extraInfo = document.getElementById('extra-info').value;
            const userEmail = document.getElementById('user-email').value;

            if (!userEmail) {
                alert("Please enter your email for feedback.");
                return;
            }

            const requestData = {
                category: localStorage.getItem('selectedCategory'),
                subcategory: localStorage.getItem('selectedSubcategory'),
                extraInfo,
                email: userEmail
            };
            console.log("Request submitted:", requestData);

            window.location.href = 'thankyou.html';
        });
    }

});
if(!document.getElementById('google-translate-script')) {
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'mk',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };
    var script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
}


