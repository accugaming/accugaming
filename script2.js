
                const scriptURL = "https://script.google.com/macros/s/AKfycbyEGIiolHBdkZfkxyoamBsUqUZGJZoF9Kkg98O_FqPI8H2gEs9D5246Y4P9GXnTQUiJQQ/exec"; // Replace with your Web App URL
        
                async function registerPlayer() {
                    let email = document.getElementById("email").value;
                    let uid = document.getElementById("uid").value;
                    let username = document.getElementById("username").value;
        
                    if (!email || !uid || !username) {
                        alert("Please fill in all fields!");
                        return;
                    }
        
                    let response = await fetch(scriptURL + "?action=register&email=" + encodeURIComponent(email) + "&uid=" + encodeURIComponent(uid) + "&username=" + encodeURIComponent(username));
                    let message = await response.text();
        
                    document.getElementById("message").innerText = message;
        
                    if (message === "Registration Full") {
                        document.getElementById("registrationForm").innerHTML = "<p>Registration is full.</p>";
                    }
        
                    loadLeaderboard();
                }
        
                async function loadLeaderboard() {
                    let response = await fetch(scriptURL + "?action=leaderboard");
                    let leaderboard = await response.json();
        
                    let html = "<table border='1'><tr><th>Email</th><th>UID</th><th>Username</th></tr>";
                    leaderboard.forEach(player => {
                        html += `<tr><td>${player.email}</td><td>${player.uid}</td><td>${player.username}</td></tr>`;
                    });
                    html += "</table>";
        
                    document.getElementById("leaderboard").innerHTML = html;
        
                    if (leaderboard.length >= 50) {
                        document.getElementById("registrationForm").innerHTML = "<p>Registration is full.</p>";
                    }
                }
        
                loadLeaderboard();

                async function sendLeaderboardToDiscord() {
                    const webhookURL = "https://discord.com/api/webhooks/1347691780887416862/zfRH4LtVLIXJKs5gIamDXvKDcedwv-J1e-oujxm1X3jFw2ixwBFmcTPrjE7-4EkuNCig"; // Paste your webhook URL here
                
                    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8asKQx3VXropwolNt2P6odVUSKvJEni2BhNdP3Wx70vczSMDwhTbq9TysiFGmo6l1IsardUFLjyND/pub?output=csv";
                    
                    try {
                        // Fetch Google Sheets data
                        const response = await fetch(sheetURL);
                        const text = await response.text();
                        const rows = text.split("\n").slice(1, 51); // Get top 50 players
                
                        let leaderboardMessage = "**🏆 Registration Full! Leaderboard (Top 50) 🏆**\n\n";
                        rows.forEach((row, index) => {
                            let cols = row.split(",");
                            leaderboardMessage += `**${index + 1}. ${cols[2]}** (UID: ${cols[1]}, Email: ${cols[0]})\n`;
                        });
                
                        // Send leaderboard to Discord
                        await fetch(webhookURL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ content: leaderboardMessage })
                        });
                
                        console.log("Leaderboard sent to Discord!");
                    } catch (error) {
                        console.error("Error sending leaderboard to Discord:", error);
                    }
                }
                
