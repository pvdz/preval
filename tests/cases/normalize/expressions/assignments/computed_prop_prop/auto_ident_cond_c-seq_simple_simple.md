# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (10, 20, $(30)) ? $(2) : $($(100)))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = (10, 20, $(30)) ? $(2) : $($(100)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
let a = 1;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
const obj /*:object*/ = {};
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
const d = {};
d[ a ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
