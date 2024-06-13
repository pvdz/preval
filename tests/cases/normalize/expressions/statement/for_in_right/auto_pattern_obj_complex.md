# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For in right > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (let x in $({ a: 1, b: 2 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
for (let x in $({ a: 1, b: 2 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpForInDeclRhs = tmpCallCallee(tmpCalleeParam);
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpForInDeclRhs = $(tmpCalleeParam);
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
let c = undefined;
for (c in b) {

}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
