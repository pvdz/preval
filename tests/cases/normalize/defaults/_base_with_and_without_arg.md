# Preval test case

# _base_with_and_without_arg.md

> Normalize > Defaults > Base with and without arg
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? `foo` : tmpParamBare;
  return a;
};
$(f(`x`));
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `foo`;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(`x`);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(`x`);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "x" );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
