# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident cond s-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(10, 20, 30) ? (40, 50, 60) : $($(100))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(10, 20, 30) ? (40, 50, 60) : $($(100))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCompProp = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCompProp = tmpCallCallee(tmpCalleeParam);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
obj[60];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = {};
b[ 60 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
