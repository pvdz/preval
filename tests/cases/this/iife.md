# Preval test case

# iife.md

> This > Iife
>
> From the React header

## Input

`````js filename=intro
const f = function () {
  let t = $(1);
  if (t) { t = $(2); }
  if (t) {
    const g = this;
  }
}
f();
`````

## Pre Normal


`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let t = $(1);
  if (t) {
    t = $(2);
  }
  if (t) {
    const g = tmpPrevalAliasThis;
  }
};
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let t = $(1);
  if (t) {
    t = $(2);
    if (t) {
      const g = tmpPrevalAliasThis;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
const t /*:unknown*/ = $(1);
if (t) {
  $(2);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
