# Preval test case

# computed_dollar_prop.md

> Normalize > Member access > Computed dollar prop
>
> Regression: computed property name of dollar was not inlined

## Input

`````js filename=intro
const a = {['$']() { $(1); }};
a['$']();
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = {
  $() {
    debugger;
    $(1);
    return undefined;
  },
};
const tmpMCF /*:unknown*/ = a.$;
$dotCall(tmpMCF, a, `\$`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {
  $() {
    $(1);
  },
};
a.$();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $(  ) {
  debugger;
  $( 1 );
  return undefined;
} };
const b = a.$;
$dotCall( b, a, "$" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = {
  $() {
    debugger;
    $(1);
    return undefined;
  },
};
const tmpMCF = a.$;
$dotCall(tmpMCF, a, `\$`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
