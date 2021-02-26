# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Return > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return delete ($(1), $(2), arg).y;
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  const tmpReturnArg = delete tmpDeleteObj.y;
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
  const tmpReturnArg = delete arg.y;
  return tmpReturnArg;
};
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
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
 - 3: true
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
