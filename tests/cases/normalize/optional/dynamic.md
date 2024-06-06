# Preval test case

# dynamic.md

> Normalize > Optional > Dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.[$()]);
`````

## Pre Normal


`````js filename=intro
const obj = { foo: 10 };
$(obj?.[$()]);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $();
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainRootComputed = $();
const obj = { foo: 10 };
const tmpChainElementObject = obj[tmpChainRootComputed];
$(tmpChainElementObject);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = { foo: 10 };
const c = b[ a ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
