# Exact integration patches

All feature integration patches require core #42. Apply to the recorded PR head. Do not modify that author branch. Prefer a new wabi/* integration checkout. The standalone `async-terrain-pr-42.patch` is an additional candidate to apply directly on exact #42 head `953902c76948d371b842fb1f9dccf711290f6ad8`; it is not an author PR or full-game validated.

- `pr-17-lighting-live.patch`: PR #17 @ `cbc9f8a00724588ce90bcb2cc7d0039b0b5dcbe6`.
- `pr-27-live.patch`: PR #27 @ `f5aca593ea04e3ec66c113933cc832cc7cc17e21`.
- `pr-28-live.patch`: PR #28 @ `8189ec87414a3905b15cad686b7691cbc5fa720b`.
- `pr-33-live.patch`: PR #33 @ `a3d860cb224a28fb48afdfebb3196d2438df9497`.
- `pr-34-live.patch`: PR #34 @ `445f76d44389ede13fe012ab71e40f4c0171a7c5`.
- `pr-35-live.patch`: PR #35 @ `bfafb78288610e732c359a1c0ad3e2a9a55f2a14`.
- `pr-36-live.patch`: PR #36 @ `34dcf17a022c90e4fa40a8a8e7349ea03624ca97`.
- `pr-37-live.patch`: PR #37 @ `7d3f29639d1f40131d363e6d9ce2ad56878e027e`.

PR17 lighting integration replaces standalone #44; do not apply both. Other patches are independent atop each exact author head + #42. Combined authors PR stacks need conflict and semantic revalidation.

Validation: git apply --check and concatenated Node syntax passed on each recorded PR head. The async terrain candidate also applies cleanly and passes concatenated syntax on exact #42; its model test is not an in-game runtime test. Runtime behavior, atlas GPU disposal and hitching remain unverified.

No integration patch for #14: safely replacing already-resident compressed textures requires a refcounted texture registry and async atomic replacement. Merely changing the gate would affect future requests only and is not advertised as a full fix.