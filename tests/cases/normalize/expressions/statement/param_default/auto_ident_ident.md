# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Param default > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = b) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    p = b;
  } else {
    p = $tdz$__pattern;
  }
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
