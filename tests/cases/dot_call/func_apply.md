# Preval test case

# func_apply.md

> Dot call > Func apply
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
f.call({pass: 1}, [1,2,3], 'nope' ,$);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
};
f.call({ pass: 1 }, [1, 2, 3], `nope`, $);
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
  return undefined;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam$3 = `nope`;
const tmpCalleeParam$5 = $;
$dotCall(tmpCallVal, tmpCallObj, `call`, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpCalleeParam /*:object*/ = { pass: 1 };
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
f.call(tmpCalleeParam, tmpCalleeParam$1, `nope`, $);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( b );
  return undefined;
};
const c = { pass: 1 };
const d = [ 1, 2, 3 ];
a.call( c, d, "nope", $ );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
