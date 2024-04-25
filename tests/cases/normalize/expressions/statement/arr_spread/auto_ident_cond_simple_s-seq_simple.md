# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident cond simple s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 ? (40, 50, 60) : $($(100)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 ? (40, 50, 60) : $($(100)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
tmpArrElToSpread = 60;
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
[...60];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ... 60 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
