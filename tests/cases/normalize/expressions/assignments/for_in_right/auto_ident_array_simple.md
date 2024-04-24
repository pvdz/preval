# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = [1, 2, 3]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = [1, 2, 3]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
let x = undefined;
const a = [1, 2, 3];
for (x in a) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3,, ];
for (a in b) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
