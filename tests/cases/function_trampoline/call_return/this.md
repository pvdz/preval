# Preval test case

# this.md

> Function trampoline > Call return > This
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(a, b, c, d, e) {
  const r = $(this);
  return r;
};
const q = f(1, 2, 3, 4, 5); // The use of `this` should prevent inlining this call, for now
$(q);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasThis);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const r = $(tmpPrevalAliasThis);
  return r;
};
const q = f(1, 2, 3, 4, 5);
$(q);
`````

## Output


`````js filename=intro
const q /*:unknown*/ = $(undefined);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( undefined );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
