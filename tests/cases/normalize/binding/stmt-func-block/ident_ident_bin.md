# Preval test case

# ident_ident_bin.md

> normalize > assignment > stmt > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3, d = 4;
  let a= b = c + d;
  $(a, b, c);
}
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = 2;
    let c = 3;
    let d = 4;
    b = c + d;
    let a = b;
    $(a, b, c);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = 2;
    b = 7;
    let a = b;
    $(a, b, 3);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 7, 7, 3
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
