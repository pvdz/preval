# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || $($(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of $($(0)) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpForOfDeclRhs = tmpCallCallee(tmpCalleeParam);
if (tmpForOfDeclRhs) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpForOfDeclRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
let tmpForOfDeclRhs = $(tmpCalleeParam);
if (tmpForOfDeclRhs) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpForOfDeclRhs = $(tmpCalleeParam$1);
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
let d = undefined;
for (d of b) {

}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
