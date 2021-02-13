# Preval test case

# ident_bin.md

> normalize > assignment > stmt > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = b + c;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 2;
  let c = 3;
  let a = b + c;
  $(a, b, c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = 2;
  let c = 3;
  let a = b + c;
  $(a, b, c);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 5, 2, 3
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same