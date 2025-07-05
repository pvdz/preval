# Preval test case

# ssa_if_hoisting_loop7.md

> If hoisting > Ai > Ssa if hoisting loop7
>
> Test if_hoisting and SSA infinite loop: identical var declarations with string literals

## Input

`````js filename=intro
const enabled = $("enabled");
if (enabled) {
  let str1 = "hello world";
  $(str1);
} else {
  let str2 = "hello world";
  $(str2);
}
`````


## Settled


`````js filename=intro
$(`enabled`);
$(`hello world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`enabled`);
$(`hello world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "enabled" );
$( "hello world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const enabled = $(`enabled`);
if (enabled) {
  let str1 = `hello world`;
  $(str1);
} else {
  let str2 = `hello world`;
  $(str2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'enabled'
 - 2: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
