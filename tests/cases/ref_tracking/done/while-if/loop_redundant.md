# Preval test case

# loop_redundant.md

> Ref tracking > Done > While-if > Loop redundant
>
> Both strings should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLLS_LEFT_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    if (c > 10) break;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4~108*/ let /*___10__*/ a = `jhayon.vercel.app`;
  let /*___14__*/ b = `jhayon.vercel.app`;
  let /*___18__*/ c = 1;
  const /*___21__*/ d = $(`x`);
  while (/*___27__*/ $LOOP_UNROLLS_LEFT_500) {
    /*28~108*/ const /*___35__*/ tmpMCF = /*___37__*/ d./*___38__*/ slice;
    /*___48__*/ a = /*___42__*/ $dotCall(/*___43__*/ tmpMCF, /*___44__*/ d, `slice`, 0);
    const /*___50__*/ e = /*___52__*/ a[0];
    const /*___55__*/ f = /*___57__*/ e === `.`;
    if (/*___61__*/ f) {
      /*62~78*/ const /*___65__*/ tmpMCF$1 = /*___67__*/ a./*___68__*/ slice;
      /*___78__*/ b = /*___72__*/ $dotCall(/*___73__*/ tmpMCF$1, /*___74__*/ a, `slice`, 1);
    } /*79~83*/ else {
      /*___83__*/ b = /*___82__*/ a;
    }
    const /*___85__*/ h = /*___87__*/ b./*___88__*/ length;
    $(/*___92__*/ h);
    /*___98__*/ c = /*___96__*/ c + 1;
    const /*___100__*/ tmpIfTest = /*___102__*/ c > 10;
    if (/*___105__*/ tmpIfTest) {
      /*106~107*/ break;
    } /*108~108*/ else {
    }
  }
} /*109~109*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @10      | ########## | not read    | none           | 48
  - w @48      | ########## | 52,67,74,82 | 10,48          | 48
  - r @52      | 48
  - r @67      | 48
  - r @74      | 48
  - r @82      | 48

b:
  - w @14      | ########## | not read    | none           | 78,83
  - w @78      | ########## | 87          | 14,78,83       | 78,83
  - w @83      | ########## | 87          | 14,78,83       | 78,83
  - r @87      | 78,83

c:
  - w @18      | ########## | 96          | none           | 98
  - r @96      | 18,98
  - w @98      | ########## | 96,102      | 18,98          | 98
  - r @102     | 98

d:
  - w @21      | ########## | 37,44       | none           | none
  - r @37      | 21
  - r @44      | 21

tmpMCF:
  - w @35      | ########## | 43          | none           | none
  - r @43      | 35

e:
  - w @50      | ########## | 57          | none           | none
  - r @57      | 50

f:
  - w @55      | ########## | 61          | none           | none
  - r @61      | 55

tmpMCF$1:
  - w @65      | ########## | 73          | none           | none
  - r @73      | 65

h:
  - w @85      | ########## | 92          | none           | none
  - r @92      | 85

tmpIfTest:
  - w @100     | ########## | 105         | none           | none
  - r @105     | 100
