# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(($($(1)) && $($(1))) || $($(2)))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(($($(1)) && $($(1))) || $($(2)))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpCompObj = tmpCallCallee(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCompObj = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCompObj = tmpCallCallee$3(tmpCalleeParam$3);
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpCompObj = $(tmpCalleeParam$3);
}
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
b.a;
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
