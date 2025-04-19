# Preval test case

# target_resolved.md

> Pcode > Target resolved
>
> This is a cut-out of the obfuscation case that triggered me to start on the pcode approach :)

(The original target included method calls, those are now resolved dotcalls)

## Options

- pcode

## Input

`````js filename=intro
let pcode = function(num_arg) {
  let out_str = ``;
  const tmpIfTest = num_arg < 62;
  if (tmpIfTest) {

  } else {
    const div = num_arg / 62;
    const pint = parseInt(div);
    out_str = pcode(pint); // including recursion
  }
  const perc = num_arg % 62;
  const tmpIfTest$1 = perc > 35;
  if (tmpIfTest$1) {
    const plus = perc + 29;
    const chr = $dotCall($String_fromCharCode, String, 'fromCharCode', plus);
    const str = out_str + chr;
    return str;
  } else {
    const alt = $dotCall($number_toString, perc, 'toString', 36);
    const altstr = out_str + alt;
    return altstr;
  }
};
pcode(1);
pcode(2);
let i = 477; 
while (--i > 0) {
  const s = pcode(i);
  $(s);
}
$('end');
`````


## Pcode output


`````fileintro
pcode =
    [ r0 = $$0 - ]
    [ r1 = - "" ]
    [ r2 < r0 - - 62 ]
    [ if r2 -
      [

      ] [
        [ r3 / r0 - - 62 ]
        [ r4 call parseInt {- undefined} r3 - ]
        [ r1 call pcode {- undefined} r4 - ]
      ]
    ]
    [ r5 % r0 - - 62 ]
    [ r6 > r5 - - 35 ]
    [ if r6 -
      [
        [ r7 + r5 - - 29 ]
        [ r8 dotcall $String_fromCharCode {String -} r7 - ]
        [ r9 + r1 - r8 - ]
        [ return r9 - ]
      ] [
        [ r10 dotcall $number_toString {r5 -} - 36 ]
        [ r11 + r1 - r10 - ]
        [ return r11 - ]
      ]
    ]
`````




## Todos triggered


None


## Pcode result


Running function "pcode":

                                    pcode          =>   eval
 - `pcode()`                   => `"<max pcode call depth exceeded>"` => `"<crash[ Maximum call stack size exceeded ]>"`  Ok
 - `pcode(undefined)`          => `"<max pcode call depth exceeded>"` => `"<crash[ Maximum call stack size exceeded ]>"`  Ok
 - `pcode(null)`               => `"0"`            => `"0"`             Ok
 - `pcode(true)`               => `"1"`            => `"1"`             Ok
 - `pcode(false)`              => `"0"`            => `"0"`             Ok
 - `pcode("")`                 => `"0"`            => `"0"`             Ok
 - `pcode("preval")`           => `"<max pcode call depth exceeded>"` => `"<crash[ Maximum call stack size exceeded ]>"`  Ok
 - `pcode(0)`                  => `"0"`            => `"0"`             Ok
 - `pcode(1)`                  => `"1"`            => `"1"`             Ok
 - `pcode(0, 0)`               => `"0"`            => `"0"`             Ok
 - `pcode(0, 1)`               => `"0"`            => `"0"`             Ok
 - `pcode(1, 0)`               => `"1"`            => `"1"`             Ok
 - `pcode(1, 1)`               => `"1"`            => `"1"`             Ok
 - `pcode(1)`                  => `"1"`            => `"1"`             Ok
 - `pcode(2)`                  => `"2"`            => `"2"`             Ok