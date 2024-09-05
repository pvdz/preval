# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && $($(1)) && $($(2))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && $($(1)) && $($(2))];
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
  if (tmpCompProp) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpCompProp = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
  if (tmpCompProp) {
    const tmpCalleeParam$3 = $(2);
    tmpCompProp = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
const obj = {};
obj[tmpCompProp];
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
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = {};
e[ b ];
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
