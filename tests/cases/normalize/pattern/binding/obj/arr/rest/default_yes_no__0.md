# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['pass']) } = 0;
$(y);
`````

## Pre Normal

`````js filename=intro
const { x: [...y] = $([`pass`]) } = 0;
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`pass`];
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = (0).x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`pass`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 0.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass",, ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ... b,, ];
const f = e.slice( 0 );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass']
 - 2: ['pass']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
