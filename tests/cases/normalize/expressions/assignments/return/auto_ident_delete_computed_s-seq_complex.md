# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete ($(1), $(2), arg)[$("y")]);
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  const tmpDeleteCompProp = $('y');
  a = delete arg[tmpDeleteCompProp];
  const tmpReturnArg = a;
  return tmpReturnArg;
};
const arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
