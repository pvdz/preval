# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = delete arg.y) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    p = delete arg.y;
  } else {
    p = $tdz$__pattern;
  }
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
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    delete arg.y;
  }
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
 - 1: undefined
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
