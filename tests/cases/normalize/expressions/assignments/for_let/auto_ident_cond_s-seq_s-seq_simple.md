# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > assignments > for_let > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = (10, 20, 30) ? (40, 50, 60) : $($(100))); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 1
 - 3: 60
 - 4: 1
 - 5: 60
 - 6: 1
 - 7: 60
 - 8: 1
 - 9: 60
 - 10: 1
 - 11: 60
 - 12: 1
 - 13: 60
 - 14: 1
 - 15: 60
 - 16: 1
 - 17: 60
 - 18: 1
 - 19: 60
 - 20: 1
 - 21: 60
 - 22: 1
 - 23: 60
 - 24: 1
 - 25: 60
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
