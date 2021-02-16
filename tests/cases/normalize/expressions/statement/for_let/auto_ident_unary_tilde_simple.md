# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > statement > for_let > auto_ident_unary_tilde_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let xyz = ~arg; ; $(1)) $(xyz);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  let xyz = ~arg;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ~1;
while (true) {
  $(xyz);
  $(1);
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - 2: 1
 - 3: -2
 - 4: 1
 - 5: -2
 - 6: 1
 - 7: -2
 - 8: 1
 - 9: -2
 - 10: 1
 - 11: -2
 - 12: 1
 - 13: -2
 - 14: 1
 - 15: -2
 - 16: 1
 - 17: -2
 - 18: 1
 - 19: -2
 - 20: 1
 - 21: -2
 - 22: 1
 - 23: -2
 - 24: 1
 - 25: -2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
