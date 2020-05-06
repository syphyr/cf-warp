module.exports = ({ privateKey, publicKey, config }) =>
	`
[Interface]
PrivateKey = ${privateKey}
# PublicKey = ${publicKey}
Address = ${config.interface.addresses.v4}/32
# Address = ${config.interface.addresses.v6}/128
# DNS = 1.1.1.1
MTU = 1420

[Peer]
PublicKey = ${config.peers[0].public_key}
Endpoint = ${config.peers[0].endpoint.host}
# Endpoint = ${config.peers[0].endpoint.v4}
# Endpoint = ${config.peers[0].endpoint.v6}
AllowedIPs = 0.0.0.0/0
# AllowedIPs = ::/0
# PersistentKeepalive = 25
`.slice(1)
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(o => {
			o.publicKey = process.argv[2]
			o.privateKey = process.argv[3]
			return o
		})
		.then(module.exports)
		.then(console.log)
}
