# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident computed simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = b[$("c")];
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = b[$(`c`)];
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  let a = tmpCompObj[tmpCompProp];
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
const a = b[tmpCompProp];
$(a, b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
