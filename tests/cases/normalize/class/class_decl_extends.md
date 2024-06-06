# Preval test case

# class_decl_extends.md

> Normalize > Class > Class decl extends
>
> Class decls should become expressions

#TODO

## Input

`````js filename=intro
class x extends y {}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = class extends y {};
$(x);
`````

## Normalized


`````js filename=intro
let x = class extends y {};
$(x);
`````

## Output


`````js filename=intro
const x = class extends y {};
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {

};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
