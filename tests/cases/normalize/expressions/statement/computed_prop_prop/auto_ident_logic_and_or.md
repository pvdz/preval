# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[($($(1)) && $($(1))) || $($(2))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[($($(1)) && $($(1))) || $($(2))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpCompProp = tmpCallCallee(tmpCalleeParam);
if (tmpCompProp) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpCompProp) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCompProp = tmpCallCallee$3(tmpCalleeParam$3);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCalleeParam = $(1);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
} else {
}
if (tmpCompProp) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpCompProp = $(tmpCalleeParam$3);
}
obj[tmpCompProp];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {};
const c = $( 1 );
let d = $( c );
if (d) {
  const e = $( 1 );
  d = $( e );
}
if (d) {

}
else {
  const f = $( 2 );
  d = $( f );
}
b[ d ];
$( a );
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
