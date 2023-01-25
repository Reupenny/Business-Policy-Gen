class PrivacyPolicy {
    constructor() {
        this.policySections = {
            "Copyright": {
                "text": "Copyright is retained by #Business# on all design work including words, pictures, ideas, visuals and illustrations unless specifically released in writing and after all costs have been settled.",
                "subSections": {
                    "Images": "Should #Business#, or the client supply an image, text, audio clip or any other file for use in a website, multimedia presentation, print item, exhibition, advertisement or any other medium believing it to be copyright and royalty-free, which subsequently emerges to have such copyright or royalty usage limitations, the client will agree to allow #Business# to remove and/or replace the file.",
                    "Indemnification": "The customer agrees to fully indemnify and hold #Business# free from harm in any and all claims resulting from the customer not having obtained all the required copyright, and/or any other necessary permissions."
                }
            },
            "Payments": {
                "text": "By engaging in any of #Business#’s services the client grants us authority to perform a credit check on either the person or business if we deem it necessary. Upon accepting a job #Business# may request a non-refundable deposit upwards of $50 based on the work that is to be completed.",
                "subSections": {
                    "Invoicing": "The client will be provided with an invoice at the completion of a project. At this time the remainder of the amount due will become payable. Any invoice queries must be submitted by email within 7 days of the invoice date.",
                    "Late Payments": "Accounts that remain unpaid after 14 days from the due date, will incur a $150 admin fee, with a further $50 admin fee being added each subsequent week the invoice is unpaid."
                }
            },
        };
    }
    setBusinessName(name) {
        this.businessName = name;
    }
    setBusinessaddress(email) {
        this.businessEmail = email;
    }
    setBusinessaddress(website) {
        this.businessWebsite = website;
    }
    generateOutput(selectedSections) {
        let output = "<h1>Privacy Policy</h1><br>" + this.businessName + " is committed to protecting your privacy in relation to your use of our products and services, and as such, fully complies with the New Zealand Privacy Act 2020. This Privacy Policy applies to our website and governs all forms of personal information and related data collection and usage by us." + "<br>";
        Object.keys(selectedSections).forEach(section => {
            if (selectedSections[section]) {
                if (this.policySections[section] && this.policySections[section].hasOwnProperty('text')) {
                    output += "<h2>" + section + "</h2><br><p>" + this.policySections[section].text.replace(/#Business#/g, this.businessName).replace(/’/g, "'") + "</p><br>";
                }
                if (this.policySections[section] && this.policySections[section].hasOwnProperty("subSections")) {
                    Object.keys(this.policySections[section].subSections).forEach(subSection => {
                        if (selectedSections[subSection]) {
                            output += "<strong>" + subSection + "</strong><br><p>" + this.policySections[section].subSections[subSection].replace(/#Business#/g, this.businessName).replace(/’/g, "'") + "</p><br>";
                        }
                    });
                }
            }
        });
        return output;
    }
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const businessName = form.elements["business-name"].value;
    const businessEmail = form.elements["business-email"].value;
    const businessWebsite = form.elements["business-website"].value;
    const selectedSections = {
        "Copyright": form.elements["copyright"].checked,
        "Images": form.elements["images"].checked,
        "Indemnification": form.elements["indemnification"].checked,
        "Payments": form.elements["payments"].checked,
    };
    const privacyPolicy = new PrivacyPolicy();
    privacyPolicy.setBusinessName(businessName);
    const output = privacyPolicy.generateOutput(selectedSections);
    document.getElementById("output").innerHTML = output;
});
var clipboard = new ClipboardJS('#copy-btn', {
    target: function () {
        return document.getElementById('output');
    }
});