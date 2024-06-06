# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 ? (40, 50, 60) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
let x = undefined;
for (x in 60) {
}
$(60);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a in 60) {

}
$( 60 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
