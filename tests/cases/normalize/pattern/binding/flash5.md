# Preval test case

# flash5.md

> Normalize > Pattern > Binding > Flash5
>
> Regression hunting

## Options

Note that the implicit global `propTDZ` is caused by TDZ access of x. It's the ternary that leaves it behind, since the actual binding is unused and eliminated.

## Input

`````js filename=intro
let x = function (a, b) {
  let foo = a === undefined ? propTDZ : a;
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
  let foo = a === undefined ? propTDZ : a;
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
  let foo = undefined;
  const tmpIfTest = a === undefined;
  if (tmpIfTest) {
    foo = propTDZ;
  } else {
    foo = a;
  }
  let bindingPatternObjRoot = b;
  let propTDZ = bindingPatternObjRoot.x;
  return undefined;
};
const tmpCallCallee = x;
const tmpCalleeParam = undefined;
const tmpCalleeParam$1 = { x: 1 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
throw `Preval: Cannot access \`propTDZ\` before initialization`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: Cannot access `propTDZ` before initialization";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
