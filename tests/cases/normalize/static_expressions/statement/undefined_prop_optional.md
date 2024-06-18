# Preval test case

# undefined_prop_optional.md

> Normalize > Static expressions > Statement > Undefined prop optional
>
> Optional property access on null/undefined should drop the remainder of the chain

## Input

`````js filename=intro
$(undefined?.foo);
$('okay, do not DCE');
`````

## Pre Normal


`````js filename=intro
$(undefined?.foo);
$(`okay, do not DCE`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = undefined;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(`okay, do not DCE`);
`````

## Output


`````js filename=intro
$(undefined);
$(`okay, do not DCE`);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( "okay, do not DCE" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'okay, do not DCE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
