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
const a /*:object*/ = {
  $() {
    debugger;
    $(1);
    return undefined;
  },
};
a.$();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({
  $() {
    $(1);
  },
}.$());
`````

## Pre Normal


`````js filename=intro
const a = {
  [`\$`]() {
    debugger;
    $(1);
  },
};
a[`\$`]();
`````

## Normalized


`````js filename=intro
const a = {
  $() {
    debugger;
    $(1);
    return undefined;
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
a.$();
`````

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
