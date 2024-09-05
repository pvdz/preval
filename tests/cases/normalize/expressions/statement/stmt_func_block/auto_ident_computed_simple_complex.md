# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    b[$("c")];
    $(a, b);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: 1 };
    let a = { a: 999, b: 1000 };
    b[$(`c`)];
    $(a, b);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
b[tmpCompProp];
const a = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
b[ a ];
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
