# Preval test case

# tdz_pattern.md

> Tofix > Tdz pattern
>
> Tricky TDZ case
> Note that block normalization causes the tdz var to be defined inside a
> new scope, leading to the early ref becoming an implicit global, which 
> triggers a different error.
> This is why singleScopeTdz is still necessary but really what it means
> is that we should update prepare to take these cases into account.

#TODO

## Input

`````js filename=intro
let x = function (a, b) {
  if ($(true)) $(a === undefined ? propTDZ : a);
  return a;
  let { x: propTDZ } = b;
};
x(undefined, {x: 1});
`````

## Pre Normal


`````js filename=intro
let x = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  if ($(true)) $(a === undefined ? propTDZ : a);
  return a;
  let { x: propTDZ } = b;
};
x(undefined, { x: 1 });
`````

## Normalized


`````js filename=intro
let x = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpCallCallee = $;
    let tmpCalleeParam = undefined;
    const tmpIfTest$1 = a === undefined;
    if (tmpIfTest$1) {
      tmpCalleeParam = propTDZ;
    } else {
      tmpCalleeParam = a;
    }
    tmpCallCallee(tmpCalleeParam);
    return a;
  } else {
    return a;
    let bindingPatternObjRoot = b;
    let propTDZ = bindingPatternObjRoot.x;
    return undefined;
  }
};
const tmpCallCallee$1 = x;
const tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = { x: 1 };
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  propTDZ;
  $(propTDZ);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  propTDZ;
  $( propTDZ );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

propTDZ

## Result

Should call `$` with:
 - 1: true
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: true
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - 1: true
 - eval returned: ('<crash[ <ref> is not defined ]>')
