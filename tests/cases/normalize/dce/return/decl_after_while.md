# Preval test case

# decl_after_while.md

> Normalize > Dce > Return > Decl after while
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

## Input

`````js filename=intro
function f() {
  // This triggers TDZ
  while (x) {
    $('ded');
  }
  return;
  
  let x = $('fail');
}
$(f());
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: while (x) {`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: while (x) {`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: while (x) {";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
