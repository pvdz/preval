# Preval test case

# auto_ident_func_id.md

> normalize > expressions > statement > for_let > auto_ident_func_id
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = function f() {}; ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = function f() {};
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function f() {};
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
