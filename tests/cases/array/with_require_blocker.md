# Preval test case

# with_require_blocker.md

> Array > With require blocker
>
> This case has a require as first call

## Options

- skipEval

## Input

`````js filename=intro
let outer_unlocker/*:(unknown, unknown)=>unknown*/ = function($$0, $$1) {
  const arg1/*:unknown*/ = $$0;
  const arg2/*:unknown*/ = $$1;
  debugger;
  const closed_vault/*:unknown*/ = the_vault();
  outer_unlocker = function($$0, $$1) {
    const arg1_1/*:unknown*/ = $$0;
    debugger;
    const tmpSSA__0x4643c1/*:number*/ = arg1_1 - 200;
    const _0x5f2571/*:unknown*/ = closed_vault[tmpSSA__0x4643c1];
    return _0x5f2571;
  };
  const tmpReturnArg/*:unknown*/ = outer_unlocker(arg1, arg2);
  return tmpReturnArg;
};
let the_vault/*:()=>unknown*/ = function() {
  debugger;
  const _0xc7f4/*:array*/ /*truthy*/ = ['winning', 'matter', 'some', 'strings'];
  the_vault = function() {
    debugger;
    return _0xc7f4;
  };
  const tmpReturnArg$1/*:unknown*/ = the_vault();
  return tmpReturnArg$1;
};

const pkg/*:unknown*/ = require(`somepackage`);                           // arbitrary require. can not mess with closure here.
const escapes/*:regex*/ /*truthy*/ = new $regex_constructor(`a`, ``);
const range/*:regex*/ /*truthy*/ = new $regex_constructor(`b`, ``);
const unlock_alias/*:unknown*/ = outer_unlocker;

const vault_lock/*:unknown*/ = the_vault();
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const val/*:unknown*/ = unlock_alias(201);
    const test = val === 'matter'; // should be first hit because 201-200 is 1, second element is "matter"
    if (test) {
      break;
    } else {
      const tmpMCF$45/*:unknown*/ = vault_lock.push;
      const tmpMCF$47/*:unknown*/ = vault_lock.shift;
      const tmpMCP$25/*:unknown*/ = $dotCall(tmpMCF$47, vault_lock, `shift`);
      $dotCall(tmpMCF$45, vault_lock, `push`, tmpMCP$25);
    }
  } catch (_0x26e149$11) {
    const tmpMCF$49/*:unknown*/ = vault_lock.push;
    const tmpMCF$51/*:unknown*/ = vault_lock.shift;
    const tmpMCP$27/*:unknown*/ = $dotCall(tmpMCF$51, vault_lock, `shift`);
    $dotCall(tmpMCF$49, vault_lock, `push`, tmpMCP$27);
  }
}
$(vault_lock[0]);

const tmpMCF$7/*:unknown*/ = $(pkg);
`````


## Settled


`````js filename=intro
const pkg /*:unknown*/ = require(`somepackage`);
$(`winning`);
$(pkg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const pkg = require(`somepackage`);
$(`winning`);
$(pkg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = require( "somepackage" );
$( "winning" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let outer_unlocker = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const arg1 = $dlr_$$0;
  const arg2 = $dlr_$$1;
  const closed_vault = the_vault();
  outer_unlocker = function ($$0, $$1) {
    let $dlr_$$2 = $$0;
    let $dlr_$$4 = $$1;
    debugger;
    const arg1_1 = $dlr_$$2;
    const tmpSSA__0x4643c1 = arg1_1 - 200;
    const _0x5f2571 = closed_vault[tmpSSA__0x4643c1];
    return _0x5f2571;
  };
  const tmpReturnArg = outer_unlocker(arg1, arg2);
  return tmpReturnArg;
};
let the_vault = function () {
  debugger;
  const _0xc7f4 = [`winning`, `matter`, `some`, `strings`];
  the_vault = function () {
    debugger;
    return _0xc7f4;
  };
  const tmpReturnArg$1 = the_vault();
  return tmpReturnArg$1;
};
const pkg = require(`somepackage`);
const escapes = new $regex_constructor(`a`, ``);
const range = new $regex_constructor(`b`, ``);
const unlock_alias = outer_unlocker;
const vault_lock = the_vault();
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const val = unlock_alias(201);
    const test = val === `matter`;
    if (test) {
      break;
    } else {
      const tmpMCF$45 = vault_lock.push;
      const tmpMCF$47 = vault_lock.shift;
      const tmpMCP$25 = $dotCall(tmpMCF$47, vault_lock, `shift`);
      $dotCall(tmpMCF$45, vault_lock, `push`, tmpMCP$25);
    }
  } catch (_0x26e149$11) {
    const tmpMCF$49 = vault_lock.push;
    const tmpMCF$51 = vault_lock.shift;
    const tmpMCP$27 = $dotCall(tmpMCF$51, vault_lock, `shift`);
    $dotCall(tmpMCF$49, vault_lock, `push`, tmpMCP$27);
  }
}
let tmpCalleeParam = vault_lock[0];
$(tmpCalleeParam);
const tmpMCF$7 = $(pkg);
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) VarStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) array reads var statement with init CallExpression
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
