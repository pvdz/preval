# Preval test case

# identity.md

> Pcode > Identity

## Options

- pcode

## Input

`````js filename=intro
let pcode = function(a) {
  return a;
};
pcode(5, 20);
pcode(19, 38);
`````


## Pcode output


`````fileintro
pcode =
    [ r0 = $$0 - ]
    [ return r0 - ]
`````




## Todos triggered


None


## Pcode result


Running function "pcode":

                                    pcode          =>   eval
 - `pcode()`                   => `undefined`      => `undefined`       Ok
 - `pcode(undefined)`          => `undefined`      => `undefined`       Ok
 - `pcode(null)`               => `null`           => `null`            Ok
 - `pcode(true)`               => `true`           => `true`            Ok
 - `pcode(false)`              => `false`          => `false`           Ok
 - `pcode("")`                 => `""`             => `""`              Ok
 - `pcode("preval")`           => `"preval"`       => `"preval"`        Ok
 - `pcode(0)`                  => `0`              => `0`               Ok
 - `pcode(1)`                  => `1`              => `1`               Ok
 - `pcode(0, 0)`               => `0`              => `0`               Ok
 - `pcode(0, 1)`               => `0`              => `0`               Ok
 - `pcode(1, 0)`               => `1`              => `1`               Ok
 - `pcode(1, 1)`               => `1`              => `1`               Ok
 - `pcode(5, 20)`              => `5`              => `5`               Ok
 - `pcode(19, 38)`             => `19`             => `19`              Ok