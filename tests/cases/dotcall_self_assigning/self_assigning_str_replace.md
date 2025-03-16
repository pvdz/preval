# Preval test case

# self_assigning_str_replace.md

> Dotcall self assigning > Self assigning str replace
>
> The var in the loop is doing `str = str.replace()`. But since it's inside a loop, we currently can't predict the result of `str.rplace` due to the chicken-egg problem.

Preval could find this sort of case when there is a decl and assign. If the decl is a primitive and the assign is a dotcall (or other call)
then it could see if it can resolve that function. if the function is depending on the type of the decl itself then start by resolving that
and see if the resulting function returns the same primitive. if so, we would have proven that the variable is always that type, no?

## Input

`````js filename=intro
let count/*:number*/ = 77;
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;                     // shortened from original
const arr/*:array*/ = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];       // shortened from original
while (true) {
  const tmpPostUpdArgIdent$1 = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    const chr = arr[count];
    if (chr) {
      const str_replace = str.replace;
      const regex/*:object*/ = new RegExp('xyz', `g`);                                    // different from original, not important
      const chr2 = arr[count]; // This could be eliminated in favor of the previous read. esp when the array does not mutate at all.
      // the str is not recognized as a string because in this expression str_replace is not recognized since str is not recognized
      // as a string, due to this assignment. preval would need to break that tie by walking the array and considering that str is
      // unconditionally a string the first time str.replace is accessed and then see that the update to str returns the result of
      // that str.replace and that there's no other variance, ergo str is either a string or the result of string.replace > a string.
      str = $dotCall(str_replace, str, 'replace', regex, chr2);
    } else {

    }
  } else {
    break;
  }
}
$(str);
`````

## Settled


`````js filename=intro
let str /*:string*/ = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
let tmpClusterSSA_count$2 /*:number*/ = 66;
const arr /*:array*/ = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpPostUpdArgIdent$2 /*:unknown*/ = tmpClusterSSA_count$2;
  tmpClusterSSA_count$2 = tmpClusterSSA_count$2 - 1;
  if (tmpPostUpdArgIdent$2) {
    const chr$1 /*:primitive*/ = arr[tmpClusterSSA_count$2];
    if (chr$1) {
      const chr2$1 /*:primitive*/ = arr[tmpClusterSSA_count$2];
      const regex$1 /*:regex*/ = /xyz/g;
      str = str.replace(regex$1, chr2$1);
    } else {
    }
  } else {
    break;
  }
}
$(str);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
let tmpClusterSSA_count$2 = 66;
const arr = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while (true) {
  const tmpPostUpdArgIdent$2 = tmpClusterSSA_count$2;
  tmpClusterSSA_count$2 = tmpClusterSSA_count$2 - 1;
  if (tmpPostUpdArgIdent$2) {
    if (arr[tmpClusterSSA_count$2]) {
      str = str.replace(/xyz/g, arr[tmpClusterSSA_count$2]);
    }
  } else {
    break;
  }
}
$(str);
`````

## Pre Normal


`````js filename=intro
let count = 77;
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
const arr = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while (true) {
  const tmpPostUpdArgIdent$1 = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    const chr = arr[count];
    if (chr) {
      const str_replace = str.replace;
      const regex = new RegExp(`xyz`, `g`);
      const chr2 = arr[count];
      str = $dotCall(str_replace, str, `replace`, regex, chr2);
    } else {
    }
  } else {
    break;
  }
}
$(str);
`````

## Normalized


`````js filename=intro
let count = 77;
let str = `var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9`;
const arr = [``, ``, ``, ``, ``, ``, ``, `x5C`, `x35`, `x36`, ``, `x31`];
while (true) {
  const tmpPostUpdArgIdent$1 = count;
  count = count - 1;
  if (tmpPostUpdArgIdent$1) {
    const chr = arr[count];
    if (chr) {
      const str_replace = str.replace;
      const regex = /xyz/g;
      const chr2 = arr[count];
      str = $dotCall(str_replace, str, `replace`, regex, chr2);
    } else {
    }
  } else {
    break;
  }
}
$(str);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = "var 44=[\"\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9";
let b = 66;
const c = [ "", "", "", "", "", "", "", "x5C", "x35", "x36", "", "x31" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b;
  b = b - 1;
  if (d) {
    const e = c[ b ];
    if (e) {
      const f = c[ b ];
      const g = /xyz/g;
      a = a.replace( g, f );
    }
  }
  else {
    break;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'var 44=["\\13\\17\\31\\8\\12\\29\\21\\22\\7\\16\\8\\7\\9'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support referencing this builtin in isFree: $string_replace
