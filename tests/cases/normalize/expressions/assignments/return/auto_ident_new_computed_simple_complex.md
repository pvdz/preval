# Preval test case

# auto_ident_new_computed_simple_complex.md

> normalize > expressions > assignments > return > auto_ident_new_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new b[$("$")](1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCompObj = b;
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCompObj = b;
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
