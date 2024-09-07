# Preval test case

# jump.md

> Pcode > Jump

## Options

- pcode

## Input

`````js filename=intro
let pcode = function(a, b) {
  A: {
    if (a) break A;
    return b;
  }
  return a * b;
};
pcode(5, 20);
pcode(19, 38);
`````

## Pre Normal


`````js filename=intro
let pcode = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  A: {
    if (a) break A;
    return b;
  }
  return a * b;
};
pcode(5, 20);
pcode(19, 38);
`````

## Pcode output

`````fileintro
pcode =
    [ r0 = $$0 - ]
    [ r1 = $$1 - ]
    [ label A 
      [ if r0 -
        [
          [ break A ]
        ] [
          [ return r1 - ]
        ]
      ]
]
    [ r2 * r0 - r1 - ]
    [ return r2 - ]
`````

Running function "pcode":

                                    pcode          =>   eval
 - `pcode()`                   => `undefined`      => `undefined`       Ok
 - `pcode(undefined)`          => `undefined`      => `undefined`       Ok
 - `pcode(null)`               => `undefined`      => `undefined`       Ok
 - `pcode(true)`               => `null`           => `null`            Ok
 - `pcode(false)`              => `undefined`      => `undefined`       Ok
 - `pcode("")`                 => `undefined`      => `undefined`       Ok
 - `pcode("preval")`           => `null`           => `null`            Ok
 - `pcode(0)`                  => `undefined`      => `undefined`       Ok
 - `pcode(1)`                  => `null`           => `null`            Ok
 - `pcode(0, 0)`               => `0`              => `0`               Ok
 - `pcode(0, 1)`               => `1`              => `1`               Ok
 - `pcode(1, 0)`               => `0`              => `0`               Ok
 - `pcode(1, 1)`               => `1`              => `1`               Ok
 - `pcode(5, 20)`              => `100`            => `100`             Ok
 - `pcode(19, 38)`             => `722`            => `722`             Ok
