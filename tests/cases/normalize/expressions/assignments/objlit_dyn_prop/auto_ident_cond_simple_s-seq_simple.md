# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 1 ? (40, 50, 60) : $($(100)))]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 1 ? (40, 50, 60) : $($(100)))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 60;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { [60]: 10 };
$(tmpCalleeParam);
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 60: '10' }
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
